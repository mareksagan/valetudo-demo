const GoToLocationCapability = require("../../../core/capabilities/GoToLocationCapability");
const PathMapEntity = require("../../../entities/map/PathMapEntity");
const PointMapEntity = require("../../../entities/map/PointMapEntity");
const stateAttrs = require("../../../entities/state/attributes");

/**
 * @extends GoToLocationCapability<import("../MockValetudoRobot")>
 */
class MockGoToLocationCapability extends GoToLocationCapability {
    /**
     * @param {import("../../../entities/core/ValetudoGoToLocation")} valetudoGoToLocation
     * @returns {Promise<void>}
     */
    async goTo(valetudoGoToLocation) {
        // Stop any existing movement
        this.robot.stopMovement();
        
        // Set status to MOVING
        const statusAttr = this.robot.state.getFirstMatchingAttribute({
            __class: stateAttrs.StatusStateAttribute.name
        });
        if (statusAttr) {
            statusAttr.value = stateAttrs.StatusStateAttribute.VALUE.MOVING;
        }
        
        const targetX = valetudoGoToLocation.coordinates.x;
        const targetY = valetudoGoToLocation.coordinates.y;
        const startX = this.robot.robotPosition.x;
        const startY = this.robot.robotPosition.y;
        
        // Show predicted path
        let map = this.robot.state.map;
        let predictedPath = new PathMapEntity({
            type: PathMapEntity.TYPE.PREDICTED_PATH,
            points: [startX, startY, targetX, targetY]
        });
        map.addEntity(predictedPath);
        this.robot.emitMapUpdated();
        
        // Animate movement
        const steps = 20;
        const stepDelay = 100; // 100ms between steps
        let currentStep = 0;
        
        const moveInterval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            
            // Interpolate position
            this.robot.robotPosition.x = startX + (targetX - startX) * progress;
            this.robot.robotPosition.y = startY + (targetY - startY) * progress;
            
            // Update angle to face target
            const dx = targetX - this.robot.robotPosition.x;
            const dy = targetY - this.robot.robotPosition.y;
            this.robot.robotPosition.angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
            
            // Add to path points
            this.robot.pathPoints.push(
                Math.round(this.robot.robotPosition.x), 
                Math.round(this.robot.robotPosition.y)
            );
            
            // Update map
            if (currentStep >= steps) {
                clearInterval(moveInterval);
                // Remove predicted path
                const idx = map.entities.indexOf(predictedPath);
                if (idx > -1) {
                    map.entities.splice(idx, 1);
                }
                // Reset status
                if (statusAttr) {
                    statusAttr.value = stateAttrs.StatusStateAttribute.VALUE.IDLE;
                }
            }
            
            this.robot.updateMapEntities();
        }, stepDelay);
    }
}

module.exports = MockGoToLocationCapability;

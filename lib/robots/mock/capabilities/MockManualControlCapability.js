const ManualControlCapability = require("../../../core/capabilities/ManualControlCapability");
const PointMapEntity = require("../../../entities/map/PointMapEntity");

/**
 * @extends ManualControlCapability<import("../MockValetudoRobot")>
 */
class MockManualControlCapability extends ManualControlCapability {
    /**
     * @param {object} options
     * @param {import("../MockValetudoRobot")} options.robot
     * @class
     */
    constructor(options) {
        super(Object.assign({}, options, {
            supportedMovementCommands: [
                ManualControlCapability.MOVEMENT_COMMAND_TYPE.FORWARD,
                ManualControlCapability.MOVEMENT_COMMAND_TYPE.BACKWARD,
                ManualControlCapability.MOVEMENT_COMMAND_TYPE.ROTATE_CLOCKWISE,
                ManualControlCapability.MOVEMENT_COMMAND_TYPE.ROTATE_COUNTERCLOCKWISE
            ]
        }));

        this.active = false;
    }

    /**
     * @returns {Promise<void>}
     */
    async enableManualControl() {
        this.active = true;
        this.robot.stopMovement(); // Stop any auto-movement
    }

    /**
     * @returns {Promise<void>}
     */
    async disableManualControl() {
        this.active = false;
    }

    /**
     * @returns {Promise<boolean>}
     */
    async manualControlActive() {
        return this.active;
    }

    /**
     * @param {import("../../../core/capabilities/ManualControlCapability").MOVEMENT_COMMAND_TYPE} movementCommand
     * @returns {Promise<void>}
     */
    async manualControl(movementCommand) {
        if (!this.active) {
            throw new Error("Manual control mode is not active.");
        }
        
        const map = this.robot.state.map;
        const pixelSize = map.pixelSize;
        
        // Get current position from robot
        let x = this.robot.robotPosition.x;
        let y = this.robot.robotPosition.y;
        let angle = this.robot.robotPosition.angle;

        switch (movementCommand) {
            case ManualControlCapability.MOVEMENT_COMMAND_TYPE.FORWARD:
                x += Math.cos((angle - 90) * Math.PI / 180) * pixelSize * 30;
                y += Math.sin((angle - 90) * Math.PI / 180) * pixelSize * 30;
                break;
            case ManualControlCapability.MOVEMENT_COMMAND_TYPE.BACKWARD:
                x -= Math.cos((angle - 90) * Math.PI / 180) * pixelSize * 30;
                y -= Math.sin((angle - 90) * Math.PI / 180) * pixelSize * 30;
                break;
            case ManualControlCapability.MOVEMENT_COMMAND_TYPE.ROTATE_CLOCKWISE:
                angle += 30;
                break;
            case ManualControlCapability.MOVEMENT_COMMAND_TYPE.ROTATE_COUNTERCLOCKWISE:
                angle -= 30;
                break;
            default:
                throw new Error("Invalid movementCommand.");
        }

        // Update robot position
        this.robot.robotPosition.x = x;
        this.robot.robotPosition.y = y;
        this.robot.robotPosition.angle = angle;
        
        // Add to path
        this.robot.pathPoints.push(Math.round(x), Math.round(y));

        // Update map with small delay for visual effect
        setTimeout(() => {
            this.robot.updateMapEntities();
        }, 100);
    }
}

module.exports = MockManualControlCapability;

const capabilities = require("./capabilities");
const DustBinFullValetudoEvent = require("../../valetudo_events/events/DustBinFullValetudoEvent");
const entities = require("../../entities");
const ErrorStateValetudoEvent = require("../../valetudo_events/events/ErrorStateValetudoEvent");
const MopAttachmentReminderValetudoEvent = require("../../valetudo_events/events/MopAttachmentReminderValetudoEvent");
const PendingMapChangeValetudoEvent = require("../../valetudo_events/events/PendingMapChangeValetudoEvent");
const Tools = require("../../utils/Tools");
const ValetudoRobot = require("../../core/ValetudoRobot");
const { MapLayer, PointMapEntity, PathMapEntity, ValetudoMap } = require("../../entities/map");
const stateAttrs = entities.state.attributes;

class MockValetudoRobot extends ValetudoRobot {
    /**
     *
     * @param {object} options
     * @param {import("../../Configuration")} options.config
     * @param {import("../../ValetudoEventStore")} options.valetudoEventStore
     */
    constructor(options) {
        super(options);
        
        // Initialize positions before building map
        this.mockMap = {
            size: 5000,
            pixelSize: 5,
            range: {
                min: 200,
                max: 800
            }
        };
        
        this.robotPosition = {
            x: this.mockMap.range.min * this.mockMap.pixelSize + 50,
            y: this.mockMap.range.min * this.mockMap.pixelSize + 50,
            angle: 180
        };
        this.chargerPosition = {
            x: this.mockMap.range.min * this.mockMap.pixelSize + 50,
            y: this.mockMap.range.min * this.mockMap.pixelSize
        };
        this.pathPoints = [];
        this.movementInterval = null;
        this.isCleaning = false;
        this.isReturning = false;
        
        this.buildMap();

        this.registerCapability(new capabilities.MockBasicControlCapability({robot: this}));
        this.registerCapability(new capabilities.MockCarpetModeControlCapability({robot: this}));
        this.registerCapability(new capabilities.MockConsumableMonitoringCapability({robot: this}));
        this.registerCapability(new capabilities.MockDoNotDisturbCapability({robot: this}));
        this.registerCapability(new capabilities.MockFanSpeedControlCapability({robot: this}));
        this.registerCapability(new capabilities.MockWaterUsageControlCapability({robot: this}));
        this.registerCapability(new capabilities.MockSpeakerVolumeControlCapability({robot: this}));
        this.registerCapability(new capabilities.MockSpeakerTestCapability({robot: this}));
        this.registerCapability(new capabilities.MockKeyLockCapability({robot: this}));
        this.registerCapability(new capabilities.MockObstacleAvoidanceControlCapability({robot: this}));
        this.registerCapability(new capabilities.MockLocateCapability({robot: this}));
        this.registerCapability(new capabilities.MockWifiConfigurationCapability({robot: this}));
        this.registerCapability(new capabilities.MockWifiScanCapability({robot: this}));
        this.registerCapability(new capabilities.MockGoToLocationCapability({robot: this}));
        this.registerCapability(new capabilities.MockMapResetCapability({robot: this}));
        this.registerCapability(new capabilities.MockPersistentMapControlCapability({robot: this}));
        this.registerCapability(new capabilities.MockPendingMapChangeHandlingCapability({robot: this}));
        this.registerCapability(new capabilities.MockMapSegmentationCapability({robot: this}));
        this.registerCapability(new capabilities.MockZoneCleaningCapability({robot: this}));
        this.registerCapability(new capabilities.MockAutoEmptyDockManualTriggerCapability({robot: this}));
        this.registerCapability(new capabilities.MockAutoEmptyDockAutoEmptyIntervalControlCapability({robot: this}));
        this.registerCapability(new capabilities.MockMappingPassCapability({robot: this}));
        this.registerCapability(new capabilities.MockVoicePackManagementCapability({robot: this}));
        this.registerCapability(new capabilities.MockManualControlCapability({robot: this}));
        this.registerCapability(new capabilities.MockCurrentStatisticsCapability({robot: this}));
        this.registerCapability(new capabilities.MockTotalStatisticsCapability({robot: this}));
        this.registerCapability(new capabilities.MockOperationModeControlCapability({robot: this}));
        this.registerCapability(new capabilities.MockPetObstacleAvoidanceControlCapability({robot: this}));
        this.registerCapability(new capabilities.MockCollisionAvoidantNavigationControlCapability({robot: this}));
        this.registerCapability(new capabilities.MockCarpetSensorModeControlCapability({robot: this}));
        this.registerCapability(new capabilities.MockMopDockCleanManualTriggerCapability({robot: this}));
        this.registerCapability(new capabilities.MockMopDockDryManualTriggerCapability({robot: this}));

        // Raise events to make them visible in the UI
        options.valetudoEventStore.raise(new DustBinFullValetudoEvent({}));
        options.valetudoEventStore.raise(new MopAttachmentReminderValetudoEvent({}));
        options.valetudoEventStore.raise(new PendingMapChangeValetudoEvent({}));
        options.valetudoEventStore.raise(new ErrorStateValetudoEvent({
            message: "This is an error message"
        }));

        this.state.upsertFirstMatchingAttribute(new entities.state.attributes.DockStatusStateAttribute({
            value: entities.state.attributes.DockStatusStateAttribute.VALUE.IDLE
        }));
    }

    getManufacturer() {
        return "Valetudo";
    }

    getModelName() {
        return "MockValetudoRobot";
    }

    getModelDetails() {
        return Object.assign(
            {},
            super.getModelDetails(),
            {
                supportedAttachments: [
                    stateAttrs.AttachmentStateAttribute.TYPE.DUSTBIN,
                    stateAttrs.AttachmentStateAttribute.TYPE.WATERTANK,
                    stateAttrs.AttachmentStateAttribute.TYPE.MOP,
                ],
                supportedDockComponents: [
                    stateAttrs.DockComponentStateAttribute.TYPE.WATER_TANK_CLEAN,
                    stateAttrs.DockComponentStateAttribute.TYPE.WATER_TANK_DIRTY,
                    stateAttrs.DockComponentStateAttribute.TYPE.DETERGENT,
                    stateAttrs.DockComponentStateAttribute.TYPE.DUSTBAG,
                ]
            }
        );
    }

    /**
     * @return {object}
     */
    getProperties() {
        const superProps = super.getProperties();
        const ourProps = {
            [MockValetudoRobot.WELL_KNOWN_PROPERTIES.FIRMWARE_VERSION]: Tools.GET_VALETUDO_VERSION()
        };

        return Object.assign(
            {},
            superProps,
            ourProps
        );
    }

    /**
     * @public
     */
    emitStateUpdated() {
        super.emitStateUpdated();
    }

    /**
     * @public
     */
    emitStateAttributesUpdated() {
        super.emitStateAttributesUpdated();
    }

    /**
     * @public
     */
    emitMapUpdated() {
        super.emitMapUpdated();
    }

    /**
     * @public
     */
    buildMap() {
        // mockMap is already initialized in constructor
        this.state.map = new ValetudoMap({
            metaData: {
                pendingMapChange: true,
            },
            size: {
                x: this.mockMap.size,
                y: this.mockMap.size
            },
            pixelSize: this.mockMap.pixelSize,
            layers: [this.buildFloor(), this.buildWall()],
            entities: [this.buildCharger(), this.buildRobot()]
        });
        this.emitMapUpdated();
    }

    /**
     * @private
     */
    buildFloor() {
        let pixels = [];
        for (let x = this.mockMap.range.min; x <= this.mockMap.range.max; x++) {
            for (let y = this.mockMap.range.min; y <= this.mockMap.range.max; y++) {
                pixels.push(x, y);
            }
        }

        return new MapLayer({
            type: MapLayer.TYPE.FLOOR,
            pixels: pixels
        });
    }

    /**
     * @private
     */
    buildWall() {
        let pixels = [];
        for (let x = this.mockMap.range.min; x <= this.mockMap.range.max; x++) {
            pixels.push(x, this.mockMap.range.min, x, this.mockMap.range.max);
        }
        for (let y = this.mockMap.range.min; y <= this.mockMap.range.max; y++) {
            pixels.push(this.mockMap.range.min, y, this.mockMap.range.max, y);
        }
        return new MapLayer({
            type: MapLayer.TYPE.WALL,
            pixels: pixels
        });
    }

    /**
     * @private
     */
    buildCharger() {
        return new PointMapEntity({
            type: PointMapEntity.TYPE.CHARGER_LOCATION,
            points: [this.mockMap.range.min * this.mockMap.pixelSize + 50, this.mockMap.range.min * this.mockMap.pixelSize]
        });
    }

    /**
     * @private
     */
    buildRobot() {
        // Safety check - ensure robotPosition exists
        if (!this.robotPosition) {
            this.robotPosition = {
                x: this.mockMap.range.min * this.mockMap.pixelSize + 50,
                y: this.mockMap.range.min * this.mockMap.pixelSize + 50,
                angle: 180
            };
        }
        return new PointMapEntity({
            type: PointMapEntity.TYPE.ROBOT_POSITION,
            points: [Math.round(this.robotPosition.x), Math.round(this.robotPosition.y)],
            metaData: {
                angle: Math.round(this.robotPosition.angle)
            }
        });
    }

    /**
     * @public
     * Start the robot movement simulation
     */
    startCleaningMovement() {
        if (this.isCleaning || this.isReturning) {
            return;
        }
        this.isCleaning = true;
        this.isReturning = false;
        
        // Clear path when starting new cleaning
        this.pathPoints = [];
        
        this.movementInterval = setInterval(() => {
            this.updateRobotPosition();
        }, 500); // Update every 500ms
    }

    /**
     * @public
     * Start returning to dock movement
     */
    startReturnToDock() {
        this.isCleaning = false;
        this.isReturning = true;
        
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
        }
        
        this.movementInterval = setInterval(() => {
            this.moveTowardsCharger();
        }, 500);
    }

    /**
     * @public
     * Stop the robot movement
     */
    stopMovement() {
        this.isCleaning = false;
        this.isReturning = false;
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    }

    /**
     * @public
     * Pause movement
     */
    pauseMovement() {
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    }

    /**
     * @private
     * Update robot position during cleaning (lawnmower pattern)
     */
    updateRobotPosition() {
        // Safety check
        if (!this.robotPosition || !this.isCleaning) {
            return;
        }
        const speed = 15; // pixels per update
        const minX = this.mockMap.range.min * this.mockMap.pixelSize + 50;
        const maxX = this.mockMap.range.max * this.mockMap.pixelSize - 50;
        const minY = this.mockMap.range.min * this.mockMap.pixelSize + 50;
        const maxY = this.mockMap.range.max * this.mockMap.pixelSize - 50;

        // Simple lawnmower pattern
        const rowHeight = 100;
        const direction = Math.floor((this.robotPosition.y - minY) / rowHeight) % 2 === 0 ? 1 : -1;

        let newX = this.robotPosition.x + speed * direction;
        let newY = this.robotPosition.y;
        let newAngle = direction === 1 ? 90 : 270;

        // If we hit a wall, move down and change direction
        if (newX > maxX) {
            newX = maxX;
            newY = Math.min(newY + rowHeight, maxY);
            newAngle = 90;
        } else if (newX < minX) {
            newX = minX;
            newY = Math.min(newY + rowHeight, maxY);
            newAngle = 270;
        }

        // Add current position to path before moving
        this.pathPoints.push(Math.round(this.robotPosition.x), Math.round(this.robotPosition.y));
        
        // Limit path length to prevent memory issues
        if (this.pathPoints.length > 2000) {
            this.pathPoints = this.pathPoints.slice(-1000);
        }

        this.robotPosition.x = newX;
        this.robotPosition.y = newY;
        this.robotPosition.angle = newAngle;

        this.updateMapEntities();
    }

    /**
     * @private
     * Move robot towards charger
     */
    moveTowardsCharger() {
        // Safety check
        if (!this.robotPosition || !this.isReturning) {
            return;
        }
        const speed = 20;
        const dx = this.chargerPosition.x - this.robotPosition.x;
        const dy = this.chargerPosition.y - this.robotPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < speed) {
            // Arrived at charger
            this.robotPosition.x = this.chargerPosition.x;
            this.robotPosition.y = this.chargerPosition.y;
            this.stopMovement();
            this.pathPoints = [];
        } else {
            // Move towards charger
            this.robotPosition.x += (dx / distance) * speed;
            this.robotPosition.y += (dy / distance) * speed;
            this.robotPosition.angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
            
            this.pathPoints.push(Math.round(this.robotPosition.x), Math.round(this.robotPosition.y));
        }

        this.updateMapEntities();
    }

    /**
     * @private
     * Update map entities with new robot position
     */
    updateMapEntities() {
        const entities = [this.buildCharger(), this.buildRobot()];
        
        // Add path if there are points
        if (this.pathPoints.length >= 4) {
            entities.push(new PathMapEntity({
                type: PathMapEntity.TYPE.PATH,
                points: [...this.pathPoints],
                metaData: {
                    angle: this.robotPosition.angle
                }
            }));
        }

        this.state.map.entities = entities;
        this.emitMapUpdated();
    }
}

module.exports = MockValetudoRobot;

START TRANSACTION;

ALTER TABLE `formation`
  ADD INDEX `idx_formation_coach_id` (`coach_id`);

ALTER TABLE `formation`
  ADD CONSTRAINT `fk_formation_coach`
  FOREIGN KEY (`coach_id`) REFERENCES `coach`(`id`)
  ON UPDATE CASCADE
  ON DELETE RESTRICT;

COMMIT;

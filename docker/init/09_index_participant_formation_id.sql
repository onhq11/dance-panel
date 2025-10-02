START TRANSACTION;

ALTER TABLE `participant`
  ADD INDEX `idx_participant_formation_id` (`formation_id`);

ALTER TABLE `participant`
  ADD CONSTRAINT `fk_participant_formation`
  FOREIGN KEY (`formation_id`) REFERENCES `formation`(`id`)
  ON UPDATE CASCADE
  ON DELETE RESTRICT;

COMMIT;

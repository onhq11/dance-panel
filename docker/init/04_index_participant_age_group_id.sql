START TRANSACTION;

ALTER TABLE `participant`
  ADD INDEX `idx_participant_age_group_id` (`age_group_id`);

ALTER TABLE `participant`
  ADD CONSTRAINT `fk_participant_age_group`
  FOREIGN KEY (`age_group_id`) REFERENCES `age_group`(`id`)
  ON UPDATE CASCADE
  ON DELETE RESTRICT;

COMMIT;

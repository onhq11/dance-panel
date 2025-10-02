START TRANSACTION;

ALTER TABLE `formation`
  ADD INDEX `idx_formation_age_group_id` (`age_group_id`);

ALTER TABLE `formation`
  ADD CONSTRAINT `fk_formation_age_group`
  FOREIGN KEY (`age_group_id`) REFERENCES `age_group`(`id`)
  ON UPDATE CASCADE
  ON DELETE RESTRICT;

COMMIT;

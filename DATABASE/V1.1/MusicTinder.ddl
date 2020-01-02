CREATE TABLE Song (id int(12) NOT NULL AUTO_INCREMENT, songName varchar(30), URL varchar(100), iTunesID int(12), totalLikes int(10), totalDislikes int(10), PRIMARY KEY (id));
CREATE TABLE User_Song (Userid int(12) NOT NULL, Songid int(12) NOT NULL, favoriteSong bit(1), PRIMARY KEY (Userid, Songid));
CREATE TABLE UserMatch (Userid int(12) NOT NULL, Userid2 int(12) NOT NULL, PRIMARY KEY (Userid, Userid2));
CREATE TABLE `User` (id int(12) NOT NULL AUTO_INCREMENT, name varchar(30) NOT NULL, birthday date NOT NULL, email varchar(40) NOT NULL UNIQUE, password varchar(60) NOT NULL, PRIMARY KEY (id));
ALTER TABLE UserMatch ADD CONSTRAINT FKUserMatch803366 FOREIGN KEY (Userid) REFERENCES `User` (id);
ALTER TABLE UserMatch ADD CONSTRAINT FKUserMatch472436 FOREIGN KEY (Userid2) REFERENCES `User` (id);
ALTER TABLE User_Song ADD CONSTRAINT FKUser_Song5222 FOREIGN KEY (Userid) REFERENCES `User` (id);
ALTER TABLE User_Song ADD CONSTRAINT FKUser_Song247165 FOREIGN KEY (Songid) REFERENCES Song (id);

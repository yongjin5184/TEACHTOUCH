create database rtes;
USE rtes;

CREATE TABLE rtes.rtes_member (
	mb_no int NOT NULL, 
	mb_id varchar(20) NOT NULL, 
	mb_password varchar(255) NOT NULL, 
	mb_name varchar(255) NOT NULL, 
	mb_job varchar(20) NOT NULL, 
	mb_email varchar(255) NOT NULL, 
	mb_phone varchar(13), 
	mb_addr varchar(255), 
	mb_level int NOT NULL DEFAULT 0
);

rtes_board
ALTER TABLE rtes.rtes_member
	ADD
		CONSTRAINT PK_rtes_member
		PRIMARY KEY NONCLUSTERED (
			mb_no ASC
		);

CREATE TABLE rtes.rtes_group (
	gro_no int NOT NULL, 
	gro_master varchar(20) NOT NULL, 
	gro_name varchar(20) NOT NULL, 
	gro_subject varchar(20) NOT NULL, 
	gro_grade int NOT NULL, 
	gro_date date
);


ALTER TABLE rtes.rtes_group
	ADD
		CONSTRAINT PK_rtes_group
		PRIMARY KEY NONCLUSTERED (
			gro_no ASC
		);

CREATE TABLE rtes.rtes_join_group (
	join_data date, 
	gro_no int, 
	mb_no int
);

CREATE TABLE rtes.rtes_board (
	bor_no int NOT NULL, 
	gro_no int
);

ALTER TABLE rtes.rtes_board
	ADD
		CONSTRAINT PK_rtes_board
		PRIMARY KEY NONCLUSTERED (
			bor_no ASC
		);


CREATE TABLE rtes.rtes_board_post (
	post_no int NOT NULL, 
	bor_no int, 
	mb_no int, 
	post_content varchar(255) NOT NULL, 
	post_subject varchar(255) NOT NULL, 
	post_hit int, 
	post_file varchar(255)
);


ALTER TABLE rtes.rtes_board_post
	ADD
		CONSTRAINT PK_rtes_board_post
		PRIMARY KEY NONCLUSTERED (
			post_no ASC
		);

CREATE TABLE rtes.rtes_query_req (
	query_req_no int NOT NULL, 
	mb_no int, 
	query_req_content varchar(2000) NOT NULL, 
	query_req_subject varchar(255) NOT NULL, 
	query_req_file varchar(255), 
	query_req_hit int, 
	query_req_date date, 
	gro_no int
);


ALTER TABLE rtes.rtes_query_req
	ADD
		CONSTRAINT PK_rtes_query_req
		PRIMARY KEY NONCLUSTERED (
			query_req_no ASC
		);


CREATE TABLE rtes.rtes_query_res (
	query_res_no int NOT NULL, 
	query_req_no int, 
	mb_no int, 
	query_res_content varchar(2000) NOT NULL, 
	query_res_subject varchar(255) NOT NULL, 
	query_res_file varchar(255), 
	query_res_refer int, 
	query_res_date date
);


ALTER TABLE rtes.rtes_query_res
	ADD
		CONSTRAINT PK_rtes_query_res
		PRIMARY KEY NONCLUSTERED (
			query_res_no ASC
		);


ALTER TABLE rtes.rtes_join_group
	ADD
		CONSTRAINT FK_rtes_group_TO_rtes_join_group
		FOREIGN KEY (
			gro_no
		)
		REFERENCES rtes.rtes_group (
			gro_no
		)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;


ALTER TABLE rtes.rtes_join_group
	ADD
		CONSTRAINT FK_rtes_member_TO_rtes_join_group
		FOREIGN KEY (
			mb_no
		)
		REFERENCES rtes.rtes_member (
			mb_no
		)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;


ALTER TABLE rtes.rtes_board
	ADD
		CONSTRAINT FK_rtes_group_TO_rtes_board
		FOREIGN KEY (
			gro_no
		)
		REFERENCES rtes.rtes_group (
			gro_no
		)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;


ALTER TABLE rtes.rtes_board_post
	ADD
		CONSTRAINT FK_rtes_board_TO_rtes_board_post
		FOREIGN KEY (
			bor_no
		)
		REFERENCES rtes.rtes_board (
			bor_no
		)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;


ALTER TABLE rtes.rtes_board_post
	ADD
		CONSTRAINT FK_rtes_member_TO_rtes_board_post
		FOREIGN KEY (
			mb_no
		)
		REFERENCES rtes.rtes_member (
			mb_no
		)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;


ALTER TABLE rtes.rtes_query_req
	ADD
		CONSTRAINT FK_rtes_member_TO_rtes_query_req
		FOREIGN KEY (
			mb_no
		)
		REFERENCES rtes.rtes_member (
			mb_no
		)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;


ALTER TABLE rtes.rtes_query_req
	ADD
		CONSTRAINT FK_rtes_group_TO_rtes_query_req
		FOREIGN KEY (
			gro_no
		)
		REFERENCES rtes.rtes_group (
			gro_no
		)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;


ALTER TABLE rtes.rtes_query_res
	ADD
		CONSTRAINT FK_rtes_query_req_TO_rtes_query_res
		FOREIGN KEY (
			query_req_no
		)
		REFERENCES rtes.rtes_query_req (
			query_req_no
		)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;


ALTER TABLE rtes.rtes_query_res
	ADD
		CONSTRAINT FK_rtes_member_TO_rtes_query_res
		FOREIGN KEY (
			mb_no
		)
		REFERENCES rtes.rtes_member (
			mb_no
		)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;

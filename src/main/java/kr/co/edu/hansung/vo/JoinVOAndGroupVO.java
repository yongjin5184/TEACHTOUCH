package kr.co.edu.hansung.vo;

import java.text.SimpleDateFormat;
import java.util.Date;

public class JoinVOAndGroupVO {
	private int groNo; //JoinGroup
	private int mbNo; //JoinGroup
	private String joinDate;//JoinGroup
	private String groMaster;
	private String groName;
	private String groSubject;
	private int groGrade;
	private String groDate;
	Date dt = new Date();
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public String getJoinDate() {
		this.joinDate = sdf.format(dt);
		return this.joinDate; 
	}
	public void setJoinDate(Date joinDate) {
		this.joinDate = joinDate.toString();
	}
	public int getGroNo() {
		return groNo;
	}
	public void setGroNo(int groNo) {
		this.groNo = groNo;
	}
	public int getMbNo() {
		return mbNo;
	}
	public void setMbNO(int mbNo) {
		this.mbNo = mbNo;
	}
	public String getGroDate() {
		groDate = sdf.format(dt);
		return this.groDate;
	}
	public void setGroDate(String groDate) {
		this.groDate = groDate;
	}
	public String getGroMaster() {
		return groMaster;
	}
	public void setGroMaster(String groMaster) {
		this.groMaster = groMaster;
	}
	public String getGroName() {
		return groName;
	}
	public void setGroName(String groName) {
		this.groName = groName;
	}
	public String getGroSubject() {
		return groSubject;
	}
	public void setGroSubject(String groSubject) {
		this.groSubject = groSubject;
	}
	public int getGroGrade() {
		return groGrade;
	}
	public void setGroGrade(int groGrade) {
		this.groGrade = groGrade;
	}
}

package kr.co.edu.hansung.vo;

import java.text.SimpleDateFormat;
import java.util.Date;



public class JoinGroupVO {
	private int mbNo;
	private int groNo;
	private String joinDate;
	private String groMaster;
	private String groName;
	private String groSubject;
	private int groGrade;
	private String groDate;
	private String groImg;
	private String groColor;
	public String getGroImg() {
		return groImg;
	}
	public void setGroImg(String groImg) {
		this.groImg = groImg;
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
	public String getGroDate() {
		return groDate;
	}
	public void setGroDate(String groDate) {
		this.groDate = groDate;
	}
	Date dt = new Date();
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public String getJoinDate() {
		return joinDate = sdf.format(dt);
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
	public String getGroColor() {
		return groColor;
	}
	public void setGroColor(String groColor) {
		this.groColor = groColor;
	}
}

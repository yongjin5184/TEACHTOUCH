package kr.co.edu.hansung.vo;

public class GroupVO {
	private int mbNo; 
	private int groNo;
	private String groMaster;
	private String groName;
	private String groSubject;
	private int groGrade;
	private String groDate;
	private String groImg;
	private String groColor;
	
	public int getMbNo() {
		return mbNo;
	}
	public void setMbNo(int mbNo) {
		this.mbNo = mbNo;
	}
	//날짜
	public String getGroDate() {
		java.util.Date dt = new java.util.Date();
		java.text.SimpleDateFormat sdf = 
		     new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String groDate = sdf.format(dt);
		return groDate;
	}
	public void setGroDate(String groDate) {
		this.groDate = groDate;
	}
	public int getGroNo() {
		return groNo;
	}
	public void setGroNo(int groNo) {
		this.groNo = groNo;
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
	public String getGroImg() {
		return groImg;
	}
	public void setGroImg(String groImg) {
		this.groImg = groImg;
	}
	public String getGroColor() {
		return groColor;
	}
	public void setGroColor(String groColor) {
		this.groColor = groColor;
	}
}

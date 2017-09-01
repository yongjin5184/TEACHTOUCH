package kr.co.edu.hansung.vo;

public class NoteVO {
	private int noteNo; //pri
	private int mbNo; //for
	private int queryReqNo; //for
	private String noteTitle;
	private String noteContent;
	private String noteSubject;
	private String noteLesson;
	private int noteImportance;
	private int noteFavorite;
	private String noteNotKnown;
	private String noteKeyPoint;
	private String noteTip;
	private String noteDate;
	private int[] noteDeleteNo;
	
	public int[] getNoteDeleteNo() {
		return noteDeleteNo;
	}
	public void setNoteDeleteNo(int[] noteDeleteNo) {
		this.noteDeleteNo = noteDeleteNo;
	}
	public int getNoteNo() {
		return noteNo;
	}
	public void setNoteNo(int noteNo) {
		this.noteNo = noteNo;
	}
	public int getMbNo() {
		return mbNo;
	}
	public void setMbNo(int mbNo) {
		this.mbNo = mbNo;
	}
	public int getQueryReqNo() {
		return queryReqNo;
	}
	public void setQueryReqNo(int queryReqNo) {
		this.queryReqNo = queryReqNo;
	}
	public String getNoteTitle() {
		return noteTitle;
	}
	public void setNoteTitle(String noteTitle) {
		this.noteTitle = noteTitle;
	}
	public String getNoteContent() {
		return noteContent;
	}
	public void setNoteContent(String noteContent) {
		this.noteContent = noteContent;
	}
	public String getNoteSubject() {
		return noteSubject;
	}
	public void setNoteSubject(String noteSubject) {
		this.noteSubject = noteSubject;
	}
	public String getNoteLesson() {
		return noteLesson;
	}
	public void setNoteLesson(String noteLesson) {
		this.noteLesson = noteLesson;
	}
	public int getNoteImportance() {
		return noteImportance;
	}
	public void setNoteImportance(int noteImportance) {
		this.noteImportance = noteImportance;
	}
	public int getNoteFavorite() {
		return noteFavorite;
	}
	public void setNoteFavorite(int noteFavorite) {
		this.noteFavorite = noteFavorite;
	}
	public String getNoteNotKnown() {
		return noteNotKnown;
	}
	public void setNoteNotKnown(String noteNotKnown) {
		this.noteNotKnown = noteNotKnown;
	}
	public String getNoteKeyPoint() {
		return noteKeyPoint;
	}
	public void setNoteKeyPoint(String noteKeyPoint) {
		this.noteKeyPoint = noteKeyPoint;
	}
	public String getNoteTip() {
		return noteTip;
	}
	public void setNoteTip(String noteTip) {
		this.noteTip = noteTip;
	}
	public String getNoteDate() {
		return noteDate;
	}
	public void setNoteDate(String noteDate) {
		this.noteDate = noteDate;
	}
}

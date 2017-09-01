package kr.co.edu.hansung.service;

import java.util.List;

import kr.co.edu.hansung.vo.MemberVO;
import kr.co.edu.hansung.vo.NoteVO;

public interface NoteService {
	public void insertNote(NoteVO noteVO);
	public List<NoteVO> selectNote(NoteVO noteVO);
	public void deleteNote(NoteVO noteVO);
}

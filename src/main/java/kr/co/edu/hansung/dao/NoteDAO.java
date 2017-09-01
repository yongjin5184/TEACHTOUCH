package kr.co.edu.hansung.dao;

import java.util.List;

import kr.co.edu.hansung.vo.NoteVO;

public interface NoteDAO {
	int insertNoteVO(NoteVO noteVO);
	List<NoteVO> selectNoteVO(NoteVO noteVO);
	void deleteNoteVO(NoteVO noteVO);
}

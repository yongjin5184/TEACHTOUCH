package kr.co.edu.hansung.serviceimpl;

import java.util.List;

import kr.co.edu.hansung.dao.NoteDAO;
import kr.co.edu.hansung.service.NoteService;
import kr.co.edu.hansung.vo.NoteVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteServiceImpl implements NoteService{
	
	@Autowired
	NoteDAO noteDAO;

	public void insertNote(NoteVO noteVO) {
		// TODO Auto-generated method stub
		System.out.println("service insertNoteVO");
		noteDAO.insertNoteVO(noteVO);
	}

	public List<NoteVO> selectNote(NoteVO noteVO) {
		System.out.println("service selectNoteVO");
		return noteDAO.selectNoteVO(noteVO);
	}

	public void deleteNote(NoteVO noteVO) {
		System.out.println("service deleteNoteVO");
		noteDAO.deleteNoteVO(noteVO);
	}
}

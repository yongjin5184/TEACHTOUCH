package kr.co.edu.hansung.controller;

import java.util.List;

import kr.co.edu.hansung.service.MemberService;
import kr.co.edu.hansung.service.NoteService;
import kr.co.edu.hansung.vo.GroupVO;
import kr.co.edu.hansung.vo.NoteVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class NoteController {
	
	@Autowired
	private NoteService noteService;
	
	@RequestMapping(value = "/insertNote.do", method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String insertNote(@RequestBody NoteVO noteVO){
		//groupNo로 찾기
		System.out.println("insertNote.do");
		this.noteService.insertNote(noteVO);
		return "노트가 생성되었습니다.";
	}
	
	@RequestMapping(value = "/selectNote.do", method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<NoteVO> selectNote(@RequestBody NoteVO noteVO){
		//groupNo로 찾기
		System.out.println("selectNote.do");
		return this.noteService.selectNote(noteVO);
	}
	
	@RequestMapping(value = "/deleteNote.do", method = RequestMethod.POST, 
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String deleteNote(@RequestBody NoteVO noteVO) {
		System.out.println("Note in Controller : " + noteVO.getNoteDeleteNo());
		for(int i = 0; i < noteVO.getNoteDeleteNo().length; i++){
			NoteVO note = new NoteVO();
			note.setNoteNo(noteVO.getNoteDeleteNo()[i]);
			System.out.println(noteVO.getNoteDeleteNo()[i]);
			this.noteService.deleteNote(note);
		}
		return "오답노트가 삭제되었습니다.";
	}
}

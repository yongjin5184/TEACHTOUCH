package kr.co.edu.hansung.daoimpl;

import java.util.List;

import kr.co.edu.hansung.dao.NoteDAO;
import kr.co.edu.hansung.vo.NoteVO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
@Repository
public class NoteDAOImpl implements NoteDAO{

	@Autowired
	private SqlSession sqlSession;
	
	public int insertNoteVO(NoteVO noteVO) {
		// TODO Auto-generated method stub
		return sqlSession.insert("insertNoteVO", noteVO);
	}
	
	public List<NoteVO> selectNoteVO(NoteVO noteVO) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("selectNoteVO");
	}

	public void deleteNoteVO(NoteVO noteVO) {
		// TODO Auto-generated method stub
		sqlSession.delete("deleteNoteVO", noteVO);
	}

}

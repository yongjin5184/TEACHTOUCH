package kr.co.edu.hansung.daoimpl;

import java.util.List;

import kr.co.edu.hansung.dao.MemberDAO;
import kr.co.edu.hansung.vo.MemberVO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MemberDAOImpl implements MemberDAO{

	@Autowired
	private SqlSession sqlSession;

	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public List<MemberVO> getMemberVO() {
		return sqlSession.selectList("getMemberVO");
	}
	
	public int insertMemberVO(MemberVO memberVO){
		return sqlSession.insert("insertMemberVO", memberVO);
	}

	public MemberVO getByIdMemberVO(MemberVO memberVO) {
		return (MemberVO)sqlSession.selectOne("getByIdMemberVO", memberVO);
	}

	public MemberVO registerByIdMemberVO(String registerId) {
		return (MemberVO)sqlSession.selectOne("registerByIdMemberVO", registerId);
	}
	
	
	
	
}

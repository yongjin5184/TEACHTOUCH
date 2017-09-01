package kr.co.edu.hansung.daoimpl;

import java.util.List;

import kr.co.edu.hansung.dao.JoinGroupDAO;
import kr.co.edu.hansung.vo.GroupVO;
import kr.co.edu.hansung.vo.JoinGroupVO;
import kr.co.edu.hansung.vo.MemberVO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class JoinGroupDAOImpl implements JoinGroupDAO{
	@Autowired
	private SqlSession sqlSession;
	
	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	public List<GroupVO> getBymbNo(MemberVO memberVO) {
		return sqlSession.selectList("getBymbNo",memberVO);
	}

	public void insertJoinGroup(JoinGroupVO joinGroupVO) {
		sqlSession.insert("insertGroup",joinGroupVO);
	}
}

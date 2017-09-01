package kr.co.edu.hansung.daoimpl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.co.edu.hansung.dao.GroupDAO;
import kr.co.edu.hansung.vo.GroupVO;
@Repository
public class GroupDAOImpl implements GroupDAO{

	@Autowired
	private SqlSession sqlSession;
	
	
	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	public List<GroupVO> selectGroup(int groupNo) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("selectGroup",groupNo);
	}

	public int insertGroup(GroupVO groupVO) {
		return ((Integer)sqlSession.insert("insertGroup",groupVO)).intValue();
	}
	
}

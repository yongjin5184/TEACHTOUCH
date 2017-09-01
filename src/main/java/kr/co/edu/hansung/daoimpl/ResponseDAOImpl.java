package kr.co.edu.hansung.daoimpl;

import java.util.List;

import kr.co.edu.hansung.dao.ResponseDAO;
import kr.co.edu.hansung.vo.ResponseVO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
@Repository
public class ResponseDAOImpl implements ResponseDAO{
	@Autowired
	private SqlSession sqlSession;
	
	public List<ResponseVO> getResponseVO(ResponseVO responseVO) {
		// TODO Auto-generated method stub
		System.out.println("getResponseVO!!!!!!!");
		return sqlSession.selectList("getResponseVO");
	}

	public int insertAnswerVO(ResponseVO responseVO) {
		return sqlSession.insert("insertAnswerVO", responseVO);
	}

	public List<ResponseVO> getResponseVOByReqNo(int queryReqNo) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("getResponseVOByReqNo");
	}

}

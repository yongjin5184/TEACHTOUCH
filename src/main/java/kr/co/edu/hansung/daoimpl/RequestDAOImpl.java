package kr.co.edu.hansung.daoimpl;

import java.util.List;

import kr.co.edu.hansung.dao.RequestDAO;
import kr.co.edu.hansung.vo.RequestVO;
import kr.co.edu.hansung.vo.SearchRequestVO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
@Repository
public class RequestDAOImpl implements RequestDAO{
	@Autowired
	private SqlSession sqlSession;
	
	public List<RequestVO> getRequestVO(RequestVO requestVO) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("getRequestVO");
	}

	public List<RequestVO> findRequestVO(SearchRequestVO searchRequestVO) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("findRequestVO");
	}

	public List<RequestVO> selectRequestVO(RequestVO requestVO) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("selectRequestVO");
	}
}

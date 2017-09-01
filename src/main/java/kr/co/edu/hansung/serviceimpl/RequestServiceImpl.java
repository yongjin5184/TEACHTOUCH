package kr.co.edu.hansung.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.edu.hansung.dao.RequestDAO;
import kr.co.edu.hansung.service.RequestService;
import kr.co.edu.hansung.vo.RequestVO;
import kr.co.edu.hansung.vo.SearchRequestVO;
@Service
public class RequestServiceImpl implements RequestService{

	@Autowired
	RequestDAO requestDAO;
	
	public List<RequestVO> getRequestVO(RequestVO requestVO) {
		// TODO Auto-generated method stub
		return requestDAO.getRequestVO(requestVO);
	}

	public List<RequestVO> findRequestVO(SearchRequestVO searchRequestVO) {
		// TODO Auto-generated method stub
		return requestDAO.findRequestVO(searchRequestVO);
	}

	public List<RequestVO> selectRequestVO(RequestVO requestVO) {
		// TODO Auto-generated method stub
		return requestDAO.selectRequestVO(requestVO);
	}

}

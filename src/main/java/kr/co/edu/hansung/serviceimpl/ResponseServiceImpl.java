package kr.co.edu.hansung.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.edu.hansung.dao.ResponseDAO;
import kr.co.edu.hansung.service.ResponseService;
import kr.co.edu.hansung.vo.ResponseVO;

@Service
public class ResponseServiceImpl implements ResponseService{
	@Autowired
	ResponseDAO responseDAO;
	
	public List<ResponseVO> getResponseVO(ResponseVO responseVO) {
		// TODO Auto-generated method stub
		return responseDAO.getResponseVO(responseVO);
	}

	public void insertAnswer(ResponseVO responseVO) {
		responseDAO.insertAnswerVO(responseVO);
	}

	public List<ResponseVO> getResponseVOByReqNo(int queryReqNo) {
		// TODO Auto-generated method stub
		return responseDAO.getResponseVOByReqNo(queryReqNo);
	}
}

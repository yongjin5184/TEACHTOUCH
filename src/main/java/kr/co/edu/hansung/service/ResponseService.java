package kr.co.edu.hansung.service;

import java.util.List;

import kr.co.edu.hansung.vo.ResponseVO;

public interface ResponseService {
	public List<ResponseVO> getResponseVO(ResponseVO responseVO);
	public List<ResponseVO> getResponseVOByReqNo(int queryReqNo);
	public void insertAnswer(ResponseVO responseVO);
}

package kr.co.edu.hansung.dao;

import java.util.List;

import kr.co.edu.hansung.vo.MemberVO;
import kr.co.edu.hansung.vo.ResponseVO;

public interface ResponseDAO {
	public List<ResponseVO> getResponseVO(ResponseVO responseVO);
	public List<ResponseVO> getResponseVOByReqNo(int queryReqNo);
	int insertAnswerVO(ResponseVO responseVO);
}

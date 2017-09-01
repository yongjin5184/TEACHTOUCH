package kr.co.edu.hansung.service;

import java.util.List;

import kr.co.edu.hansung.vo.RequestVO;
import kr.co.edu.hansung.vo.SearchRequestVO;

public interface RequestService {
	public List<RequestVO> getRequestVO(RequestVO requestVO);
	public List<RequestVO> findRequestVO(SearchRequestVO searchRequestVO);
	public List<RequestVO> selectRequestVO(RequestVO requestVO);
}

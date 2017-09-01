package kr.co.edu.hansung.dao;

import java.util.List;

import kr.co.edu.hansung.vo.GroupVO;
import kr.co.edu.hansung.vo.RequestVO;
import kr.co.edu.hansung.vo.SearchRequestVO;

public interface RequestDAO {
	public List<RequestVO> getRequestVO(RequestVO requestVO);
	public List<RequestVO> findRequestVO(SearchRequestVO searchRequestVO);
	public List<RequestVO> selectRequestVO(RequestVO requestVO);
}

package kr.co.edu.hansung.vo;

import java.util.List;

public class QnAVO {
	private List<RequestVO> requestVOList;
	private List<ResponseVO> responseVOList;
	
	public List<RequestVO> getRequestVOList() {
		return requestVOList;
	}
	public void setRequestVOList(List<RequestVO> requestVOList) {
		this.requestVOList = requestVOList;
	}
	public List<ResponseVO> getResponseVOList() {
		return responseVOList;
	}
	public void setResponseVOList(List<ResponseVO> responseVOList) {
		this.responseVOList = responseVOList;
	}
}

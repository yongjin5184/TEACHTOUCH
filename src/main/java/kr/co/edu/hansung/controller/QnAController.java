package kr.co.edu.hansung.controller;

import java.util.ArrayList;
import java.util.List;

import kr.co.edu.hansung.service.RequestService;
import kr.co.edu.hansung.service.ResponseService;
import kr.co.edu.hansung.vo.QnAVO;
import kr.co.edu.hansung.vo.RequestVO;
import kr.co.edu.hansung.vo.ResponseVO;
import kr.co.edu.hansung.vo.SearchRequestVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class QnAController {
	@Autowired
	private RequestService requestService;
	@Autowired
	private ResponseService responseServie;

	@RequestMapping(value = "/searchQnA.do", method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<QnAVO> searchQnA(@RequestBody SearchRequestVO searchRequestVO){
		System.out.println("성공!!!!!!");
		System.out.println(searchRequestVO.getSearchText());
		ResponseVO responseVO = new ResponseVO();
		List<ResponseVO> responseVOList;
		List<RequestVO> requestVOList = requestService.findRequestVO(searchRequestVO);
		QnAVO qnAVO = new QnAVO();
		List <QnAVO> qnAVOList= new ArrayList<QnAVO>();
		for(int i = 0; i < requestVOList.size(); i++){
			System.out.println(requestVOList.get(i).getQueryReqContent());
			int queryReqNo = requestVOList.get(i).getQueryReqNo(); // 프라이머리키를 가져와서
			System.out.println("프라이머리키 = " + queryReqNo);
			responseVO.setQueryReqNo(queryReqNo); //프라이머리키는 하나
			responseVOList = responseServie.getResponseVO(responseVO);
			qnAVO.setRequestVOList(requestVOList); //질문은 하나
			for(int j = 0; j < responseVOList.size(); j++){ //프라이머리키로 조회해서 리스트로 넣어줌
				System.out.println(responseVOList.get(j).getQueryResContent());
				qnAVO.setResponseVOList(responseVOList);
				qnAVOList.add(qnAVO);
			}
		}
		return qnAVOList;
	}
	@RequestMapping(value = "/selectQnA.do", method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<QnAVO> selectQnA(@RequestBody RequestVO requestVO){
		System.out.println("selectQnA Controller");
		ResponseVO responseVO = new ResponseVO();
		List <QnAVO> qnAVOList= new ArrayList<QnAVO>();
		QnAVO qnAVO = new QnAVO();
		List<ResponseVO> responseVOList;
		List<RequestVO> requestVOList = this.requestService.selectRequestVO(requestVO);
		for(int i = 0; i < requestVOList.size(); i++){
//			System.out.println(requestVOList.get(i).getQueryReqContent());
			int queryReqNo = requestVOList.get(i).getQueryReqNo(); // 프라이머리키를 가져와서
			System.out.println("프라이머리키 = " + queryReqNo);
			responseVOList = responseServie.getResponseVOByReqNo(queryReqNo);
			qnAVO.setRequestVOList(requestVOList); //질문은 하나
			for(int j = 0; j < responseVOList.size(); j++){ //프라이머리키로 조회해서 리스트로 넣어줌
				System.out.println(responseVOList.get(j).getQueryResContent());
				qnAVO.setResponseVOList(responseVOList);
				qnAVOList.add(qnAVO);
			}
		}
		return qnAVOList;
	}
}

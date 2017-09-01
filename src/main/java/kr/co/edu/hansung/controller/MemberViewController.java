package kr.co.edu.hansung.controller;

import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import kr.co.edu.hansung.service.MemberService;
import kr.co.edu.hansung.serviceimpl.MemberServiceImpl;
import kr.co.edu.hansung.vo.MemberVO;
@SessionAttributes("MemberVO")
@Controller
public class MemberViewController {
	
	private static final Logger logger = LoggerFactory.getLogger(MemberViewController.class);
	
	@Autowired
	private MemberService memberService;
	
	@RequestMapping(value = "/selectMember.do", method = RequestMethod.POST)
	public @ResponseBody List<MemberVO> selectMember(){
		//responseBody에 붙어서
		System.out.println("selectmember.do");
		List<MemberVO> memberInfo = this.memberService.getMemberVO();
		System.out.println(memberInfo.get(1).getMbName());
		return memberInfo;
	}
	
	@RequestMapping(value = "/insertMember.do", method = RequestMethod.POST, 
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody void insertMember(@RequestBody MemberVO memberVO){
		System.out.println("insertMember.do");
		this.memberService.insertMember(memberVO);
		System.out.println(memberVO.getMbName());
//		return "회원 가입 완료!";
	}
	//최초 아이디와 비번으로 멤버 데이터를 가져옴.
	@RequestMapping(value = "/getByIdMember.do", method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody MemberVO getByIdMemberVO(@RequestBody MemberVO memberVO){
		//responseBody에 붙어서
		System.out.println("getByIdMember.do");
		MemberVO memberInfo = this.memberService.getByIdMemberVO(memberVO);
		System.out.println(memberInfo);
		return memberInfo;
	}
	
	@RequestMapping(value = "/registerByIdMember.do", method = RequestMethod.POST)
	public @ResponseBody MemberVO registerByIdMemberVO(@RequestParam String mbRegisterId){
		//responseBody에 붙어서
		System.out.println("registerByIdMember.do");
		MemberVO memberInfo = this.memberService.registerByIdMemberVO(mbRegisterId);
		System.out.println(memberInfo);
		return memberInfo;
	}
}

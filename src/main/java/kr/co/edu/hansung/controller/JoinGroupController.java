package kr.co.edu.hansung.controller;

import java.util.Date;
import java.util.List;

import kr.co.edu.hansung.service.JoinGroupService;
import kr.co.edu.hansung.vo.GroupVO;
import kr.co.edu.hansung.vo.JoinGroupVO;
import kr.co.edu.hansung.vo.MemberVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class JoinGroupController {
	@Autowired
	private JoinGroupService joinGroupService;
	
	@RequestMapping(value = "/getBymbNo.do", method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<GroupVO> getByIdMemberVO(@RequestBody MemberVO memberVO){
		//responseBody에 붙어서
		System.out.println("getBymbIdGroup.do");
		return this.joinGroupService.getBymbNo(memberVO);
	}
}

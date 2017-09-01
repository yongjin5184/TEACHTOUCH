package kr.co.edu.hansung.controller;

import java.util.List;

import kr.co.edu.hansung.service.GroupService;
import kr.co.edu.hansung.service.JoinGroupService;
import kr.co.edu.hansung.vo.GroupVO;
import kr.co.edu.hansung.vo.JoinGroupVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class GroupController {
	
	@Autowired
	private GroupService groupService;
	
	@Autowired
	private JoinGroupService JoinGroupService;
	
	//전체 그룹 보여주기
	@RequestMapping(value = "/selectGroup.do", method = RequestMethod.POST)
	public @ResponseBody List<GroupVO> getGroupInfo(@RequestParam int groupNo){
		//groupNo로 찾기
		System.out.println("selectGroup.do");
		return this.groupService.selectGroup(groupNo);
	}
	
	/*//아이디에 해당하는 그룹 보여주기
	@RequestMapping(value = "/selectGroupById.do", method = RequestMethod.POST)
	public @ResponseBody List<GroupVO> getGroupById(@RequestParam int groupNo){
		//groupNo로 찾기
		System.out.println("selectGroup.do");
		return this.groupService.selectGroup(groupNo);
	}*/
	
	@RequestMapping(value = "/insertGroup.do", method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody GroupVO insertGroup(@RequestBody GroupVO groupVO){
		//groupNo로 찾기
		System.out.println("insertGroup.do");
		this.groupService.insertGroup(groupVO);
		System.out.println("nononono = " + groupVO.getGroNo());
		System.out.println("nononono = " + groupVO.getMbNo());
		JoinGroupVO joinGroupVO = new JoinGroupVO();
		joinGroupVO.setGroNo(groupVO.getGroNo());
		joinGroupVO.setMbNO(groupVO.getMbNo());
		JoinGroupService.insertJoinGroup(joinGroupVO);
		return groupVO;
	}
}

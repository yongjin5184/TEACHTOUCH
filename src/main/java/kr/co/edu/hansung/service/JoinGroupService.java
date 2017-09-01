package kr.co.edu.hansung.service;

import java.util.List;

import kr.co.edu.hansung.vo.GroupVO;
import kr.co.edu.hansung.vo.JoinGroupVO;
import kr.co.edu.hansung.vo.MemberVO;

public interface JoinGroupService {
	public List<GroupVO> getBymbNo(MemberVO memberVO);
	public void insertJoinGroup(JoinGroupVO joinGroupVO);
}

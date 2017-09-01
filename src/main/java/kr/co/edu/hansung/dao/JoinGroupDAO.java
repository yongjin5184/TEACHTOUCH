package kr.co.edu.hansung.dao;

import java.util.List;

import kr.co.edu.hansung.vo.GroupVO;
import kr.co.edu.hansung.vo.JoinGroupVO;
import kr.co.edu.hansung.vo.MemberVO;

public interface JoinGroupDAO {
	public List<GroupVO> getBymbNo(MemberVO memberVO);
	public void insertJoinGroup(JoinGroupVO joinGroupVO);
}

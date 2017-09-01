package kr.co.edu.hansung.service;

import java.util.List;

import kr.co.edu.hansung.vo.GroupVO;

public interface GroupService {
	public List<GroupVO> selectGroup(int groupNo);
	public int insertGroup(GroupVO groupVO);
}

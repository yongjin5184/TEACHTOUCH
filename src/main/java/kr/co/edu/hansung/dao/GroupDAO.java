package kr.co.edu.hansung.dao;

import java.util.List;

import kr.co.edu.hansung.vo.GroupVO;

public interface GroupDAO {
	public List<GroupVO> selectGroup(int groupNo);
	public int insertGroup(GroupVO groupVO);
}

package kr.co.edu.hansung.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.edu.hansung.dao.GroupDAO;
import kr.co.edu.hansung.service.GroupService;
import kr.co.edu.hansung.vo.GroupVO;
@Service
public class GroupServiceImpl implements GroupService{
	@Autowired
	GroupDAO groupDAO;
	
	public List<GroupVO> selectGroup(int groupNo) {
		return groupDAO.selectGroup(groupNo);
	}

	public int insertGroup(GroupVO groupVO) {
		return groupDAO.insertGroup(groupVO);
	}
	
}

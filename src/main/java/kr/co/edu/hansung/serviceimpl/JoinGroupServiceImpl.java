package kr.co.edu.hansung.serviceimpl;

import java.util.List;

import kr.co.edu.hansung.dao.GroupDAO;
import kr.co.edu.hansung.dao.JoinGroupDAO;
import kr.co.edu.hansung.service.JoinGroupService;
import kr.co.edu.hansung.vo.GroupVO;
import kr.co.edu.hansung.vo.JoinGroupVO;
import kr.co.edu.hansung.vo.MemberVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JoinGroupServiceImpl implements JoinGroupService{
	@Autowired
	JoinGroupDAO joinGroupDAO;

	public List<GroupVO> getBymbNo(MemberVO memberVO) {
		// TODO Auto-generated method stub
		System.out.println("service getBymbIdGroup");
		return joinGroupDAO.getBymbNo(memberVO);
	}

	public void insertJoinGroup(JoinGroupVO joinGroupVO) {
		// TODO Auto-generated method stub
		System.out.println("service insertJoinGroup");
		joinGroupDAO.insertJoinGroup(joinGroupVO);
	}
}

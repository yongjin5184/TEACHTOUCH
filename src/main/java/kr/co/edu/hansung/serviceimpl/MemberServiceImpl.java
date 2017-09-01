package kr.co.edu.hansung.serviceimpl;

import java.util.List;

import kr.co.edu.hansung.dao.MemberDAO;
import kr.co.edu.hansung.service.MemberService;
import kr.co.edu.hansung.vo.MemberVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService{
	
	@Autowired
	MemberDAO memberDAO;
	
	public List<MemberVO> getMemberVO() {
		System.out.println("service getMemberVO");
		return memberDAO.getMemberVO();
	}

	public void insertMember(MemberVO memberVO){
		System.out.println("service insertMember");
		memberDAO.insertMemberVO(memberVO);
	}
	
	public MemberVO getByIdMemberVO(MemberVO memberVO){
		System.out.println("service getByIdMemberVO");
		return memberDAO.getByIdMemberVO(memberVO);
	}

	public MemberVO registerByIdMemberVO(String registerId) {
		System.out.println("service registerByIdMemberVO");
		return memberDAO.registerByIdMemberVO(registerId);
	}

}

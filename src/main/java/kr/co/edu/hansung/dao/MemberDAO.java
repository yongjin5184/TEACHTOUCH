package kr.co.edu.hansung.dao;

import java.util.List;

import kr.co.edu.hansung.vo.MemberVO;

public interface MemberDAO {
	List<MemberVO> getMemberVO();
	int insertMemberVO(MemberVO memberVO);
	MemberVO getByIdMemberVO(MemberVO memberVO);
	MemberVO registerByIdMemberVO(String registerId);
}

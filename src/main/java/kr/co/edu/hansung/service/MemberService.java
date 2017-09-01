package kr.co.edu.hansung.service;

import java.util.List;


import kr.co.edu.hansung.vo.MemberVO;

public interface MemberService {
	public List<MemberVO> getMemberVO();
	public void insertMember(MemberVO memberVO);
	public MemberVO getByIdMemberVO(MemberVO memberVO);
	public MemberVO registerByIdMemberVO(String registerId);
}

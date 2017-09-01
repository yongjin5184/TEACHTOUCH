<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
    <title>BoardContentView</title>
</head>
<body>
<h1>
    MemberTest
</h1>

<P>  ${val.get(0).mbId}. </P>
<P>  ${val.get(0).mbPassword}. </P>
<P>  ${val.get(0).mbName}. </P>
<P>  ${val.get(0).mbJob}. </P>
</body>
</html>
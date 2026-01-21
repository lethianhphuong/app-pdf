	Dim username, password, apiUrl, authCode, apiResponse, authorizationToken
	username = InputBox("Enter username:", "Authentication")
	password = InputBox("Enter password:", "Authentication")
	
	authorizationToken = "Basic MDAxOnF0dWRAMjAyMg=="
	apiUrl = "https://dt.csdlnv.v06.bca/v1/qtud-sso/oauth/token"
	Set http = CreateObject("MSXML2.ServerXMLHTTP.6.0")
	http.setOption 2, 13056
	http.Open "POST", apiUrl, False
	http.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"
	http.setRequestHeader "Authorization", authorizationToken
	
	Dim postData 
	postData = "grant_type=password&username=" & username & "&password=" & password
	
	http.Send postData
	
	responseText = http.responseText
		
	startPos = InStr(responseText, """authCode"":")
	If startPos > 0 Then
		startPos = startPos + Len("""authCode:"":")
		endPos = InStr(startPos, responseText, """")
		authCode = Mid(responseText, startPos, endPos - startPos)
		authCode = Replace(authCode, """", "")
	authCode = Trim(authCode)
	End If
	
	Dim chromePath, link
	chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
	link = "http://localhost:5173/nvcban?authCode=" & authCode
	
	Call OpenChromeWithAuth(chromePath, link)
	
	Sub OpenChromeWithAuth(chromePath, link)
		Dim shell, urlP
		Set shell = CreateObject("WScript.Shell")
		shell.Run chr(34) & chromePath & chr(34) & " --disable-web-security --user-data-dir=~/chrome_dev --allow-inserure-localhost " & link
		End Sub
	
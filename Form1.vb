Public Class mainWindow
    Public Shared Sub main()
        Application.Run(New mainWindow)
    End Sub

    Private Sub exitMenuItem_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles exitMenuItem.Click
        Me.Close()
    End Sub

    Private Sub mainWindow_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        todayAmhLable_Click(sender, e)
        notifyIcon.Text = dateConverter.toAmharic(DateTime.Now).dateTimeString
    End Sub
    Private Sub mainWindow_Shown(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Shown
        Me.Hide()
    End Sub
    'Public Sub mainWindow_StartupNextInstance(ByVal sender As Object, ByVal e As ApplicationServices.StartupNextInstanceEventArgs) Handles Me.StartupNextInstance
    '    Me.Show()
    'End Sub

    Private Sub convertDateMenuItem_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles convertDateMenuItem.Click
        Me.Show()
        Me.HideMenuItem.Visible = True
        Me.convertDateMenuItem.Visible = False
    End Sub

    Private Sub HideMenuItem_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles HideMenuItem.Click
        Me.Hide()
        Me.HideMenuItem.Visible = False
        Me.convertDateMenuItem.Visible = True
    End Sub
    Private Sub mainWindow_Closing(ByVal sender As Object, ByVal e As System.ComponentModel.CancelEventArgs) Handles MyBase.Closing
        If Me.Visible AndAlso MessageBox.Show("Do you want to minimize to notification area?", "Date converter", MessageBoxButtons.YesNo) = DialogResult.Yes Then
            e.Cancel = True ' Cancel the Closing event from closing the form.
            Me.HideMenuItem_Click(sender, e)
        End If
    End Sub

    Private Sub todayAmhLable_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles todayAmhLable.Click
        todayAmhLable.Text = "Today is: " + dateConverter.toAmharic(DateTime.Now).dateTimeString + "   [click to refresh]"
    End Sub
    Private Sub amhMonth_ValueChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles amhMonth.ValueChanged
        If amhMonth.Value < 13 Then
            amhDate.Maximum = 30
        ElseIf amhYear.Value Mod 4 = 3 Then
            amhDate.Maximum = 6
        Else
            amhDate.Maximum = 5
        End If
        setEngLable()
    End Sub

    Private Sub amhYear_ValueChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles amhYear.ValueChanged
        If amhMonth.Value = 13 Then
            If amhYear.Value Mod 4 = 3 Then
                amhDate.Maximum = 6
            Else
                amhDate.Maximum = 5
            End If
        End If
        setEngLable()
    End Sub

    Private Sub engMonth_ValueChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles engMonth.ValueChanged
        Select Case engMonth.Value
            Case 1, 3, 5, 7, 8, 10, 12
                engDate.Maximum = 31
            Case 2
                If engYear.Value Mod 4 = 0 Then
                    engDate.Maximum = 29
                Else
                    engDate.Maximum = 28
                End If
            Case 4, 6, 9, 11
                engDate.Maximum = 30
        End Select
        setAmhLable()
    End Sub

    Private Sub engYear_ValueChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles engYear.ValueChanged
        If engMonth.Value = 2 Then
            If engYear.Value Mod 4 = 0 Then
                engDate.Maximum = 29
            Else
                engDate.Maximum = 28
            End If
        End If
        setAmhLable()
    End Sub
    Private Function setAmhLable()
        Try
            amOut.Text = "In Amharic: " + dateConverter.toAmharic(New DateTime(engYear.Value, engMonth.Value, engDate.Value)).dateString
        Catch ex As Exception
            amOut.Text = "not set"
        End Try
    End Function
    Private Function setEngLable()
        Try
            enOut.Text = "In English: " + dateConverter.toEnglish(New amhDate(amhYear.Value, amhMonth.Value, amhDate.Value, 0, 0, 0)).ToLongDateString
        Catch ex As Exception
            enOut.Text = "not set"
        End Try
    End Function

    Private Sub engDate_ValueChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles engDate.ValueChanged
        setAmhLable()
    End Sub

    Private Sub amhDate_ValueChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles amhDate.ValueChanged
        setEngLable()
        enOut.Text = "In English: " + dateConverter.toEnglish(New amhDate(amhYear.Value, amhMonth.Value, amhDate.Value, 0, 0, 0)).ToLongDateString
    End Sub

    Private Sub notifyIcon_MouseMove(ByVal sender As Object, ByVal e As System.Windows.Forms.MouseEventArgs) Handles notifyIcon.MouseMove
        notifyIcon.Text = dateConverter.toAmharic(DateTime.Now).dateTimeString
    End Sub
End Class
Class amhDate
    Public month As Integer 'not public
    Public datee As Integer
    Public year As Integer
    Dim hour As Integer
    Dim minute As Integer
    Dim second As Integer
    Public day As Integer
    Public dateString As String
    Public dateTimeString As String
    Public Sub New(ByVal yr As Integer, ByVal mon As Integer, ByVal dd As Integer, ByVal hr As Integer, ByVal min As Integer, ByVal sec As Integer)
        year = yr
        month = mon
        datee = dd
        hour = hr
        minute = min
        second = sec
        day = (year + 2 * month + datee + amhDifference() + 7000) Mod 7
        dateString = daystring() + CStr(datee) + "/" + CStr(month) + "/" + CStr(year)
        dateTimeString = dateString + timeString()
    End Sub
    Private Function timeString() As String
        If hour < 13 Then
            Return " " + CStr(hour) + ":" + CStr(minute) + ":" + CStr(second) + " a.m"
        Else : Return " " + CStr(hour - 12) + ":" + CStr(minute) + ":" + CStr(second) + " p.m"
        End If
    End Function
    Private Function amhDifference() As Integer
        Return -(Math.Floor((2023 - year) / 4))
    End Function
    Private Function daystring() As String
        Select Case day
            Case 1
                Return "Mon "
            Case 2
                Return "Tue "
            Case 3
                Return "Wed "
            Case 4
                Return "Thu "
            Case 5
                Return "Fri "
            Case 6
                Return "Sat "
            Case 0
                Return "Sun "
            Case Else
                Return "Error:" + CStr(day) + " "
        End Select
    End Function
End Class
Class dateConverter
    Const oneHour As Integer = 3600
    Const oneDay As Integer = 24 * oneHour
    Const oneYear As Integer = 365 * oneDay
    Const fourYears As Integer = 4 * oneYear + oneDay
    Const difference As Long = (7 * oneYear + 8 * 30 * oneDay) * 10000000L
    Shared Function toEnglish(ByVal amh As amhDate) As DateTime
        Dim month As Integer = amh.month
        Dim datee As Integer = amh.datee
        If month = 13 Then
            month = 12
            datee = 30
        End If
        Dim eng As DateTime = New DateTime(New DateTime(amh.year, month, datee).Ticks + difference)
        Dim amh1 As amhDate
        For ii As Integer = 1 To 20
            amh1 = toAmharic(eng)
            If amh1.datee = amh.datee AndAlso amh1.month = amh.month AndAlso amh1.year = amh.year Then
                Return eng
            End If
            eng = New DateTime(eng.Ticks + oneDay * 10000000L)
        Next
    End Function
    Shared Function toAmharic(ByVal engDate As DateTime) As amhDate
        Dim difference As Long = Math.Ceiling((engDate.Ticks - New DateTime(7, 8, 28).Ticks) / 10000000)
        Dim fourYearsPassed As Long = Math.Floor(difference / fourYears)
        Dim remainingYears As Long = Math.Floor((difference - fourYearsPassed * fourYears) / oneYear)
        If remainingYears = 4 Then remainingYears = 3
        Dim remainingMonths As Long = Math.Floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear) / (30 * oneDay))
        Dim remainingDays As Long = Math.Floor((difference - fourYearsPassed * fourYears - remainingYears * oneYear - remainingMonths * 30 * oneDay) / oneDay)
        Dim remainingHours As Long = engDate.Hour - 6
        If remainingHours < 0 Then remainingHours = 24 + remainingHours
        Return New amhDate(remainingYears + 4 * fourYearsPassed, remainingMonths + 1, remainingDays + 1, remainingHours, engDate.Minute, engDate.Second)
    End Function
    'Shared Function checker() As Boolean
    '    Dim eng As Date = New DateTime(9999, 1, 1)
    '    Dim amh As amhDate
    '    Dim amh1 As amhDate = toAmharic(eng)
    '    While eng.Ticks > oneYear * 8 * 10000000L
    '        eng = New DateTime(eng.Ticks - oneDay * 10000000L)
    '        amh = toAmharic(eng)
    '        If (eng.DayOfWeek <> amh.day) OrElse (amh.datee <> amh1.datee - 1 AndAlso Not (amh.datee = 30 AndAlso amh1.datee = 1) AndAlso Not (amh1.datee = 1 AndAlso amh1.month = 1 AndAlso amh.month = 13 AndAlso ((amh.year Mod 4 <> 3 AndAlso amh.datee = 5) OrElse (amh.year Mod 4 = 3 AndAlso amh.datee = 6)))) Then
    '            MessageBox.Show(amh.dateString + "   " + amh1.dateString + "    " + eng.ToShortDateString)
    '        End If
    '        amh1 = amh
    '    End While
    '    Return True
    'End Function
End Class
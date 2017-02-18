<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class mainWindow
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.components = New System.ComponentModel.Container
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(mainWindow))
        Me.notifyIcon = New System.Windows.Forms.NotifyIcon(Me.components)
        Me.iconContextMenu = New System.Windows.Forms.ContextMenuStrip(Me.components)
        Me.convertDateMenuItem = New System.Windows.Forms.ToolStripMenuItem
        Me.exitMenuItem = New System.Windows.Forms.ToolStripMenuItem
        Me.HideMenuItem = New System.Windows.Forms.ToolStripMenuItem
        Me.engDate = New System.Windows.Forms.NumericUpDown
        Me.amhYear = New System.Windows.Forms.NumericUpDown
        Me.amhMonth = New System.Windows.Forms.NumericUpDown
        Me.amhDate = New System.Windows.Forms.NumericUpDown
        Me.engYear = New System.Windows.Forms.NumericUpDown
        Me.engMonth = New System.Windows.Forms.NumericUpDown
        Me.enIn = New System.Windows.Forms.Label
        Me.enOut = New System.Windows.Forms.Label
        Me.amIn = New System.Windows.Forms.Label
        Me.amOut = New System.Windows.Forms.Label
        Me.todayAmhLable = New System.Windows.Forms.Label
        Me.iconContextMenu.SuspendLayout()
        CType(Me.engDate, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.amhYear, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.amhMonth, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.amhDate, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.engYear, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.engMonth, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'notifyIcon
        '
        Me.notifyIcon.BalloonTipIcon = System.Windows.Forms.ToolTipIcon.Info
        Me.notifyIcon.BalloonTipText = "date"
        Me.notifyIcon.BalloonTipTitle = "Ethiopian date:"
        Me.notifyIcon.ContextMenuStrip = Me.iconContextMenu
        Me.notifyIcon.Icon = CType(resources.GetObject("notifyIcon.Icon"), System.Drawing.Icon)
        Me.notifyIcon.Text = "Ethiopian date"
        Me.notifyIcon.Visible = True
        '
        'iconContextMenu
        '
        Me.iconContextMenu.Items.AddRange(New System.Windows.Forms.ToolStripItem() {Me.convertDateMenuItem, Me.exitMenuItem, Me.HideMenuItem})
        Me.iconContextMenu.Name = "iconContextMenu"
        Me.iconContextMenu.Size = New System.Drawing.Size(278, 100)
        '
        'convertDateMenuItem
        '
        Me.convertDateMenuItem.Name = "convertDateMenuItem"
        Me.convertDateMenuItem.Size = New System.Drawing.Size(277, 32)
        Me.convertDateMenuItem.Text = "use my date converter"
        '
        'exitMenuItem
        '
        Me.exitMenuItem.Name = "exitMenuItem"
        Me.exitMenuItem.Size = New System.Drawing.Size(277, 32)
        Me.exitMenuItem.Text = "Exit my converter"
        '
        'HideMenuItem
        '
        Me.HideMenuItem.Name = "HideMenuItem"
        Me.HideMenuItem.Size = New System.Drawing.Size(277, 32)
        Me.HideMenuItem.Text = "hide converter"
        Me.HideMenuItem.Visible = False
        '
        'engDate
        '
        Me.engDate.Location = New System.Drawing.Point(93, 15)
        Me.engDate.Maximum = New Decimal(New Integer() {31, 0, 0, 0})
        Me.engDate.Minimum = New Decimal(New Integer() {1, 0, 0, 0})
        Me.engDate.Name = "engDate"
        Me.engDate.Size = New System.Drawing.Size(35, 22)
        Me.engDate.TabIndex = 1
        Me.engDate.Value = New Decimal(New Integer() {1, 0, 0, 0})
        '
        'amhYear
        '
        Me.amhYear.Location = New System.Drawing.Point(175, 43)
        Me.amhYear.Maximum = New Decimal(New Integer() {9991, 0, 0, 0})
        Me.amhYear.Name = "amhYear"
        Me.amhYear.Size = New System.Drawing.Size(48, 22)
        Me.amhYear.TabIndex = 2
        Me.amhYear.Value = New Decimal(New Integer() {2005, 0, 0, 0})
        '
        'amhMonth
        '
        Me.amhMonth.Location = New System.Drawing.Point(134, 43)
        Me.amhMonth.Maximum = New Decimal(New Integer() {13, 0, 0, 0})
        Me.amhMonth.Minimum = New Decimal(New Integer() {1, 0, 0, 0})
        Me.amhMonth.Name = "amhMonth"
        Me.amhMonth.Size = New System.Drawing.Size(35, 22)
        Me.amhMonth.TabIndex = 3
        Me.amhMonth.Value = New Decimal(New Integer() {1, 0, 0, 0})
        '
        'amhDate
        '
        Me.amhDate.Location = New System.Drawing.Point(93, 43)
        Me.amhDate.Maximum = New Decimal(New Integer() {30, 0, 0, 0})
        Me.amhDate.Minimum = New Decimal(New Integer() {1, 0, 0, 0})
        Me.amhDate.Name = "amhDate"
        Me.amhDate.Size = New System.Drawing.Size(35, 22)
        Me.amhDate.TabIndex = 4
        Me.amhDate.Value = New Decimal(New Integer() {1, 0, 0, 0})
        '
        'engYear
        '
        Me.engYear.Location = New System.Drawing.Point(175, 15)
        Me.engYear.Maximum = New Decimal(New Integer() {9999, 0, 0, 0})
        Me.engYear.Minimum = New Decimal(New Integer() {7, 0, 0, 0})
        Me.engYear.Name = "engYear"
        Me.engYear.Size = New System.Drawing.Size(48, 22)
        Me.engYear.TabIndex = 5
        Me.engYear.Value = New Decimal(New Integer() {2012, 0, 0, 0})
        '
        'engMonth
        '
        Me.engMonth.Location = New System.Drawing.Point(134, 15)
        Me.engMonth.Maximum = New Decimal(New Integer() {12, 0, 0, 0})
        Me.engMonth.Minimum = New Decimal(New Integer() {1, 0, 0, 0})
        Me.engMonth.Name = "engMonth"
        Me.engMonth.Size = New System.Drawing.Size(35, 22)
        Me.engMonth.TabIndex = 6
        Me.engMonth.Value = New Decimal(New Integer() {1, 0, 0, 0})
        '
        'enIn
        '
        Me.enIn.AutoSize = True
        Me.enIn.Location = New System.Drawing.Point(-1, 17)
        Me.enIn.Name = "enIn"
        Me.enIn.Size = New System.Drawing.Size(88, 17)
        Me.enIn.TabIndex = 7
        Me.enIn.Text = "English Date"
        '
        'enOut
        '
        Me.enOut.AutoSize = True
        Me.enOut.Location = New System.Drawing.Point(229, 45)
        Me.enOut.Name = "enOut"
        Me.enOut.Size = New System.Drawing.Size(88, 17)
        Me.enOut.TabIndex = 8
        Me.enOut.Text = "English Date"
        '
        'amIn
        '
        Me.amIn.AutoSize = True
        Me.amIn.Location = New System.Drawing.Point(-1, 45)
        Me.amIn.Name = "amIn"
        Me.amIn.Size = New System.Drawing.Size(93, 17)
        Me.amIn.TabIndex = 9
        Me.amIn.Text = "Amharic Date"
        '
        'amOut
        '
        Me.amOut.AutoSize = True
        Me.amOut.Location = New System.Drawing.Point(229, 17)
        Me.amOut.Name = "amOut"
        Me.amOut.Size = New System.Drawing.Size(93, 17)
        Me.amOut.TabIndex = 10
        Me.amOut.Text = "Amharic Date"
        '
        'todayAmhLable
        '
        Me.todayAmhLable.AutoSize = True
        Me.todayAmhLable.Location = New System.Drawing.Point(39, 92)
        Me.todayAmhLable.Name = "todayAmhLable"
        Me.todayAmhLable.Size = New System.Drawing.Size(164, 17)
        Me.todayAmhLable.TabIndex = 11
        Me.todayAmhLable.Text = "click for today in amharic"
        '
        'mainWindow
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(8.0!, 16.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(497, 118)
        Me.Controls.Add(Me.todayAmhLable)
        Me.Controls.Add(Me.amIn)
        Me.Controls.Add(Me.enIn)
        Me.Controls.Add(Me.amOut)
        Me.Controls.Add(Me.engMonth)
        Me.Controls.Add(Me.enOut)
        Me.Controls.Add(Me.engYear)
        Me.Controls.Add(Me.amhDate)
        Me.Controls.Add(Me.amhMonth)
        Me.Controls.Add(Me.amhYear)
        Me.Controls.Add(Me.engDate)
        Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.Fixed3D
        Me.Icon = CType(resources.GetObject("$this.Icon"), System.Drawing.Icon)
        Me.Name = "mainWindow"
        Me.Text = "date converter"
        Me.iconContextMenu.ResumeLayout(False)
        CType(Me.engDate, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.amhYear, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.amhMonth, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.amhDate, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.engYear, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.engMonth, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub
    Friend WithEvents notifyIcon As System.Windows.Forms.NotifyIcon
    Friend WithEvents iconContextMenu As System.Windows.Forms.ContextMenuStrip
    Friend WithEvents convertDateMenuItem As System.Windows.Forms.ToolStripMenuItem
    Friend WithEvents exitMenuItem As System.Windows.Forms.ToolStripMenuItem
    Friend WithEvents engDate As System.Windows.Forms.NumericUpDown
    Friend WithEvents amhYear As System.Windows.Forms.NumericUpDown
    Friend WithEvents amhMonth As System.Windows.Forms.NumericUpDown
    Friend WithEvents amhDate As System.Windows.Forms.NumericUpDown
    Friend WithEvents engYear As System.Windows.Forms.NumericUpDown
    Friend WithEvents engMonth As System.Windows.Forms.NumericUpDown
    Friend WithEvents enIn As System.Windows.Forms.Label
    Friend WithEvents enOut As System.Windows.Forms.Label
    Friend WithEvents amIn As System.Windows.Forms.Label
    Friend WithEvents amOut As System.Windows.Forms.Label
    Friend WithEvents todayAmhLable As System.Windows.Forms.Label
    Friend WithEvents HideMenuItem As System.Windows.Forms.ToolStripMenuItem

End Class

1、停止SQL服务器

2、复制xpdoginfo32.dll到C:\Program Files\TPA和C:\Program Files\TPAdatabase文件夹内覆盖掉原文件 必须两个同时替换
(64位服务是xpdoginfo64.dll不清楚两个文件一起复制就行）

如果授权83版本还需要将TPA UPDATE文件夹里的程序替换到TPA根目录中（替换文件一定要备份之前的文件）

3、启动SQL服务器

4、打开TPAMAIN，复制安装代号，拷贝到注册工具中

5、注册工具中点击生成序列号：产品序号和安装密码，直接在易助授权登录即可

6、打开MSSQL 找到易助系统数据库TPASYS 在TPABRA注册信息表中加一行REGED  T 0的信息； 详细见图提示注册


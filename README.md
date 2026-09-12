# YiZhuERP8-KeyGen

仅供学习，请在下载后24小时内删除

提供HTML版本和Exe版本

### 算法摘要（默认模式）

```
ROR8(b,n) = ((b>>(n&7)) | (b<<(8-(n&7)))) & 0xFF
encode(s) = 逐字节 out[i]=ROR8(gbk(s)[i], i+1)，再转大写十六进制文本   # %%%用户块和两处salt共用

userblock = encode(授权用户)
body      = 客户号 + "00" + "00000000" + "@@@" + "11" + "%%%" + userblock

ss1   = body[0] + "00@" + body[-1]
HASH1 = MD5(body + encode(ss1))[0:4]              # 小写hex 8位 → 产品序号尾部

ss2   = ss1 + HASH1[0] + 安装序号[-1]
HASH2 = MD5(body + HASH1 + 安装序号 + encode(ss2))[4:8]   # 小写hex 8位 → 验证口令

产品序号 = 客户号-00-00000000--@@@11-%%%{userblock}-{HASH1}
验证口令 = {HASH2}
```

- 客户号(id260)、授权用户(id240)、安装序号(id280) 是输入；产品序号(id300)、验证口令(id320)
  是**输出**（点击后被写回这两个框）。
- HASH1 只依赖 客户号+授权用户；HASH2 依赖 客户号+授权用户+安装序号。

**三种模式已还原并统一**（默认 / 产品人数授权 / 分模块人数授权）：
- **产品人数授权**(id160+设定用户数id350)：`f1=人数(%02d)`，无 f3 段（序列号单短横线）。
  `generate(c,u,i,count=N)` / JS `{count:N}`。
- **分模块人数授权**(id150+左侧模块 listview id110)：25 个模块，`f1=各模块人数之和`，
  `f2=32位模块位掩码(模块i→bit 31-i)`，`f3=各模块"<字母><人数>"串`（字母表
  `mjpdruebwynkatqf~!@#$%^&*`）。`generate(c,u,i,modules={idx:cnt})` / JS `{modules:{...}}`。
  默认模式 = 分模块且未勾任何模块。

**统一 salt 规则**：序列号按短横线拆字段，salt 源逐字段取「偶序号取首字符/奇序号取末字符」，
空字段不贡献但占序号；salt2 再把 h1、安装序号当两个新字段续取。这条规则一次解释全部三种模式
（详见 ALGORITHM.md）。验证：`verify_product.py` / `verify_modules.py` 各对活进程 7 组新输入
逐字节相同；JS `verify_yz.html` 33 组向量（25 ASCII + 8 中文 GBK，含 1 组原版实机截图确认）全过。
**注意**：salt 逐字段取的是 GBK 编码后的首/末**字节**（非首/末字符）——原版是 MBCS/C 程序按字节串
索引，ASCII 时字节==字符，但中文客户号/安装序号必须取单个 GBK 字节（详见 ALGORITHM.md）。

### 验证结果

- Python `yz_keygen.py` 自检 5 组 + `verify_live.py` 对**活进程** 7 组全新输入
  （含 GBK 中文用户名“测试用户”、符号、超长用户名）逐字节相同 →
  日志 [`unpack_work/handoff_logs/verify_live_final.log`](./unpack_work/handoff_logs/verify_live_final.log)。
- JavaScript 在真实浏览器 JS 引擎里 33 组向量全过（25 ASCII + 8 中文 GBK，含中文出现在
  授权用户/客户号/安装序号各字段，其中 1 组=原版实机截图逐字节确认），`MD5('abc')` 自检通过；
  GBK 编码器已对全部 21791 个 cp936 字符与 Python 逐字节核对，0 差异。

### 关于 `易助配置.ini` 的 KEY / 易助模块 / 易成模块

点击“生成序列号”**既不读也不写** `易助配置.ini`（实验中文件 md5 不变；算法与 salt 完全由三个
输入框 + 默认值决定，无任何 ini 派生量）。因此这三个字段**与生成算法无关**，不是 MD5 的
key/派生材料，是该工具其它功能的样本/配置数据。

### 关于 DES（更正旧结论）

旧文记为 DES-ECB。运行时抓取证明生成回调只做 MD5 哈希。二进制里确实存在一处 DES 左移表
（内存底稿偏移 `0xE36C0` 的 `01 01 02 02 02 02 02 02`），但属于别的功能（可能给
`易助模块/易成模块` 那类 blob 用），与“生成”按钮无关。**没有先假设标准 DES-ECB；结论完全由
运行时 CryptoAPI 抓取得出。**

> 依赖：64 位 Python（Anaconda 3.12 已验证），`pip install pefile`（仅 `yz_cryptohook.py` 需要）。
> 驱动 UI 用 Win32 窗口消息（跨 32/64 位）；抓哈希用 64 位 Python 调 WOW64 子进程的自写调试器。

---

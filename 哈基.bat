@echo off
setlocal enabledelayedexpansion

REM 检查管理员权限
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo 你没给管理员权限啊喂
    pause
    exit /b 1
)

REM 处理命令行参数
if "%~1"=="_r" (
    echo 正在启用摄像头...
    powershell -command "Enable-PnpDevice -InstanceId (Get-PnpDevice -Class Camera | Select-Object -ExpandProperty InstanceId) -Confirm:$false" 2>nul
    if !errorlevel! equ 0 (
        echo 摄像头已成功启用
    ) else (
        echo 启用摄像头时出错，可能已经启用或设备不存在
    )
    goto :end
)

if "%~1"=="_f" (
    echo 检查摄像头状态...
    powershell -command "$cameras = Get-PnpDevice -Class Camera; if ($cameras) { foreach ($cam in $cameras) { if ($cam.Status -eq 'OK') { echo 摄像头已启用; exit 0 } } echo '摄像头已禁用' } else { echo '未找到摄像头设备' }"
    goto :end
)

REM 如果没有参数，默认禁用摄像头
echo 正在禁用摄像头...
powershell -command "Disable-PnpDevice -InstanceId (Get-PnpDevice -Class Camera | Select-Object -ExpandProperty InstanceId) -Confirm:$false" 2>nul

if !errorlevel! equ 0 (
    echo 摄像头已成功禁用，重启后生效
    echo.
    echo 使用说明:
    echo 再次运行此脚本并添加参数 _r 来启用摄像头
    echo 添加参数 _f 来检查摄像头状态
) else (
    echo 禁用摄像头时出错，可能已经禁用或设备不存在
)

:end
pause
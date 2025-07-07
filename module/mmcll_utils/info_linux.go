package mmcll_utils

import (
	"os/user"
	"path/filepath"
)

func GetWindowsVersion() bool {
	return false
}

func GetHomeDir() (string, error) {
	// 获取当前用户
	currentUser, err := user.Current()
	if err != nil {
		return "", err
	}
	return filepath.Join(currentUser.HomeDir, ".PCL.Nova"), nil
}

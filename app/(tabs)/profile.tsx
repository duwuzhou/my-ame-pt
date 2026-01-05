import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
    {
      icon: '🎮',
      title: '我的游戏',
      description: '查看游戏历史',
      onPress: () => {},
    },
    {
      icon: '⭐',
      title: '我的收藏',
      description: '收藏的游戏',
      onPress: () => {},
    },
    {
      icon: '📊',
      title: '游戏统计',
      description: '查看游戏数据',
      onPress: () => {},
    },
    {
      icon: '⚙️',
      title: '设置',
      description: '应用设置',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <View style={styles.contentWrapper}>
          {/* 用户信息卡片 */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <ThemedText style={styles.avatarText}>👤</ThemedText>
            </View>
            <ThemedText type="title" style={styles.userName}>
              游客
            </ThemedText>
            <ThemedText style={styles.userDesc}>
              欢迎来到小游戏合集
            </ThemedText>
          </View>

          {/* 统计信息 */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>0</ThemedText>
              <ThemedText style={styles.statLabel}>游玩次数</ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>0</ThemedText>
              <ThemedText style={styles.statLabel}>收藏游戏</ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>0</ThemedText>
              <ThemedText style={styles.statLabel}>游戏时长</ThemedText>
            </View>
          </View>

          {/* 菜单列表 */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.menuIconContainer}>
                  <ThemedText style={styles.menuIcon}>{item.icon}</ThemedText>
                </View>
                <View style={styles.menuContent}>
                  <ThemedText style={styles.menuTitle}>{item.title}</ThemedText>
                  <ThemedText style={styles.menuDescription}>
                    {item.description}
                  </ThemedText>
                </View>
                <ThemedText style={styles.menuArrow}>›</ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          {/* 关于信息 */}
          <View style={styles.aboutContainer}>
            <ThemedText style={styles.aboutText}>
              My Game PT v1.0.0
            </ThemedText>
            <ThemedText style={styles.aboutText}>
              Made with ❤️ by 花落
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 600,
  },
  // 用户信息卡片
  profileCard: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: 24,
    marginBottom: 8,
  },
  userDesc: {
    fontSize: 14,
    opacity: 0.7,
  },
  // 统计信息
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
    marginHorizontal: 10,
  },
  // 菜单列表
  menuContainer: {
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.1)',
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 24,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 13,
    opacity: 0.6,
  },
  menuArrow: {
    fontSize: 24,
    opacity: 0.3,
  },
  // 关于信息
  aboutContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  aboutText: {
    fontSize: 12,
    opacity: 0.5,
    marginBottom: 4,
  },
});

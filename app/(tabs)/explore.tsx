import { StyleSheet, ScrollView, Linking, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ExploreScreen() {
  const openGitHub = () => {
    Linking.openURL('https://github.com/duwuzhou/my-game-pt');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>关于</ThemedText>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">My Game PT</ThemedText>
          <ThemedText style={styles.version}>版本 1.0.0</ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="defaultSemiBold">简介</ThemedText>
          <ThemedText style={styles.description}>
            一个简洁的小游戏合集应用，收录了多款经典休闲小游戏，让你随时随地享受游戏乐趣。
            <p>等着我更新游戏吧！</p>
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="defaultSemiBold">游戏列表</ThemedText>
          <ThemedText style={styles.gameItem}>🎮 2048 - 经典数字合并游戏</ThemedText>
          <ThemedText style={styles.gameItem}>🦘 跳跃前进 - 躲避障碍跑酷游戏</ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="defaultSemiBold">技术栈</ThemedText>
          <ThemedText style={styles.techItem}>• Expo / React Native</ThemedText>
          <ThemedText style={styles.techItem}>• Expo Router</ThemedText>
          <ThemedText style={styles.techItem}>• TypeScript</ThemedText>
        </ThemedView>

        <Pressable onPress={openGitHub} style={styles.linkButton}>
          <ThemedText style={styles.linkText}>GitHub 仓库</ThemedText>
        </Pressable>

        <ThemedText style={styles.footer}>Made with ❤️</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    marginBottom: 24,
  },
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  version: {
    marginTop: 4,
    opacity: 0.6,
  },
  description: {
    marginTop: 8,
    lineHeight: 22,
  },
  gameItem: {
    marginTop: 8,
  },
  techItem: {
    marginTop: 6,
    opacity: 0.8,
  },
  linkButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#0ea5e9',
  },
  linkText: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    marginTop: 32,
    opacity: 0.5,
  },
});

import { StyleSheet, ScrollView, Linking, Pressable, View, Image } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ExploreScreen() {
  const openGitHub = () => {
    Linking.openURL('https://github.com/duwuzhou');
  };

  const openEmail = () => {
    Linking.openURL('mailto:1503965150@qq.com');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <View style={styles.contentWrapper}>
          <ThemedText type="title" style={styles.title}>关于我们</ThemedText>

          {/* 公益说明 */}
          <ThemedView style={[styles.card, styles.publicWelfareCard]}>
            <ThemedText style={styles.publicWelfareIcon}>💚</ThemedText>
            <ThemedText type="subtitle" style={styles.publicWelfareTitle}>
              公益小游戏平台
            </ThemedText>
            <ThemedText style={styles.description}>
              这是一个完全免费的公益小游戏网站，致力于为大家提供健康、有趣的休闲娱乐体验。
              我们不收取任何费用，没有广告干扰，只为让每个人都能享受纯粹的游戏乐趣。
            </ThemedText>
          </ThemedView>

          {/* 项目信息 */}
          <ThemedView style={styles.card}>
            <ThemedText type="subtitle">My Game PT</ThemedText>
            <ThemedText style={styles.version}>版本 1.0.0</ThemedText>
            <ThemedText style={styles.description}>
              一个简洁的小游戏合集应用，收录了多款经典休闲小游戏，让你随时随地享受游戏乐趣。
              更多精彩游戏正在开发中，敬请期待！
            </ThemedText>
          </ThemedView>

          {/* 游戏列表 */}
          <ThemedView style={styles.card}>
            <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
              🎮 游戏列表
            </ThemedText>
            <ThemedText style={styles.gameItem}>• 2048 - 经典数字合并游戏</ThemedText>
            <ThemedText style={styles.gameItem}>• 跳跃前进 - 躲避障碍跑酷游戏</ThemedText>
            <ThemedText style={styles.moreGames}>更多游戏持续更新中...</ThemedText>
          </ThemedView>

          {/* 赞助支持 */}
          <ThemedView style={[styles.card, styles.sponsorCard]}>
            <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
              ☕ 支持我们
            </ThemedText>
            <ThemedText style={styles.description}>
              如果您喜欢这个项目，可以通过以下方式支持我们的持续开发：
            </ThemedText>

            {/* 赞助二维码区域 */}
            <View style={styles.qrCodeContainer}>
              <View style={styles.qrCodeItem}>
                <Image
                  source={require('@/assets/images/zsm.jpg')}
                  style={styles.qrCodeImage}
                  resizeMode="contain"
                />
                <ThemedText style={styles.qrCodeLabel}>微信赞赏</ThemedText>
              </View>
            </View>

            <ThemedText style={styles.sponsorNote}>
              您的支持是我们持续更新的动力！感谢每一位支持者 🙏
            </ThemedText>
          </ThemedView>

          {/* 联系方式 */}
          <ThemedView style={styles.card}>
            <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
              📮 联系我们
            </ThemedText>
            <ThemedText style={styles.description}>
              欢迎提出建议、反馈问题或合作咨询：
            </ThemedText>

            <View style={styles.contactList}>
              <Pressable onPress={openEmail} style={styles.contactItem}>
                <ThemedText style={styles.contactIcon}>📧</ThemedText>
                <View style={styles.contactInfo}>
                  <ThemedText style={styles.contactLabel}>邮箱</ThemedText>
                  <ThemedText style={styles.contactValue}>1503965150@qq.com</ThemedText>
                </View>
              </Pressable>

              <Pressable onPress={openGitHub} style={styles.contactItem}>
                <ThemedText style={styles.contactIcon}>💻</ThemedText>
                <View style={styles.contactInfo}>
                  <ThemedText style={styles.contactLabel}>GitHub</ThemedText>
                  <ThemedText style={styles.contactValue}>duwuzhou</ThemedText>
                </View>
              </Pressable>
            </View>
          </ThemedView>

          <ThemedText style={styles.footer}>Made with ❤️ by 花落</ThemedText>
          <ThemedText style={styles.copyright}>© 2024 My Game PT. All rights reserved.</ThemedText>
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
    maxWidth: 800,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  publicWelfareCard: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    alignItems: 'center',
  },
  publicWelfareIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  publicWelfareTitle: {
    marginBottom: 12,
    textAlign: 'center',
  },
  sponsorCard: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  version: {
    marginTop: 4,
    opacity: 0.6,
    fontSize: 14,
  },
  description: {
    marginTop: 8,
    lineHeight: 24,
    opacity: 0.8,
  },
  gameItem: {
    marginTop: 8,
    fontSize: 15,
    opacity: 0.9,
  },
  moreGames: {
    marginTop: 12,
    fontSize: 14,
    opacity: 0.6,
    fontStyle: 'italic',
  },
  techItem: {
    marginTop: 8,
    opacity: 0.8,
    fontSize: 15,
  },
  // 赞助二维码样式
  qrCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  qrCodeItem: {
    alignItems: 'center',
  },
  qrCodeImage: {
    width: 180,
    height: 180,
    borderRadius: 12,
    marginBottom: 8,
  },
  qrCodeLabel: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.8,
  },
  sponsorNote: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    fontStyle: 'italic',
  },
  // 联系方式样式
  contactList: {
    marginTop: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
    borderRadius: 12,
    marginBottom: 12,
  },
  contactIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  linkButton: {
    marginTop: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: '#0ea5e9',
    alignItems: 'center',
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  linkText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    marginTop: 32,
    opacity: 0.5,
    textAlign: 'center',
    fontSize: 16,
  },
  copyright: {
    marginTop: 8,
    marginBottom: 20,
    opacity: 0.4,
    textAlign: 'center',
    fontSize: 12,
  },
});

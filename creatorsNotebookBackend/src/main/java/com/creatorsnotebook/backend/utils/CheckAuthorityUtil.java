package com.creatorsnotebook.backend.utils;

import com.creatorsnotebook.backend.model.entity.UserProjectBridgeEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Stream;

@Component
public class CheckAuthorityUtil {

  /**
   * 어떤 유저가 해당 프로젝트에 보유한 권한을 바탕으로 authorityLevel에 해당되는지 확인한다.
   * <br/>
   * <strong>아래의 단계를 보유한다. 각기 숫자 뒤에는 가능한 권한을 명시한다. </strong>
   * <ul>
   *  <li> 1 : CREATOR </li>
   *  <li> 2 : CREATOR, ADMIN </li>
   *  <li> 3 : CREATOR, ADMIN, MEMBER </li>
   *  <li> 4 : CREATOR, ADMIN, MEMBER, VIEWER </li>
   * </ul>
   *
   * @param userProjectBridge 유저-프로젝트 권한 정보를 보유한 객체
   * @param authorityLevel 확인하고 싶은 권한 레벨
   * @return 기능 활용 가능 여부
   */
  public boolean checkUserHasAuthority(UserProjectBridgeEntity userProjectBridge, int authorityLevel) {
    if (userProjectBridge == null || userProjectBridge.getAuthority() == null) {
      return false;
    }
    String auth = userProjectBridge.getAuthority();
    return switch (authorityLevel) {
      case 1 -> "CREATOR".equals(auth);
      case 2 -> List.of("CREATOR", "ADMIN").contains(auth);
      case 3 -> List.of("CREATOR", "ADMIN", "MEMBER").contains(auth);
      case 4 -> List.of("CREATOR", "ADMIN", "MEMBER", "VIEWER").contains(auth);
      default -> false;
    };
  }
}
